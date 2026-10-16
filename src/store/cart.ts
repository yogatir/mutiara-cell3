import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../data/products";

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  cartItemId: string; // Unique ID for cart item combining product ID and color
}

interface CartStore {
  items: CartItem[];
  isCartDrawerOpen: boolean;
  addItem: (product: Product, selectedColor?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateColor: (cartItemId: string, newColor: string) => void;
  clearCart: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  get totalItems(): number;
  get totalPrice(): number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartDrawerOpen: false,
      openCartDrawer: () => set({ isCartDrawerOpen: true }),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),
      toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
      addItem: (product, selectedColor) => {
        const currentItems = get().items;
        const color = selectedColor || (product.colors && product.colors[0]) || undefined;
        const cartItemId = `${product.id}-${color || 'default'}`;
        
        const existingItem = currentItems.find((item) => item.cartItemId === cartItemId);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1, selectedColor: color, cartItemId }] });
        }
      },
      removeItem: (cartItemId) => {
        set({
          items: get().items.filter((item) => item.cartItemId !== cartItemId),
        });
      },
      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          set({
            items: get().items.filter((item) => item.cartItemId !== cartItemId),
          });
        } else {
          set({
            items: get().items.map((item) =>
              item.cartItemId === cartItemId ? { ...item, quantity } : item
            ),
          });
        }
      },
      updateColor: (cartItemId, newColor) => {
        const currentItems = get().items;
        const itemToUpdate = currentItems.find(item => item.cartItemId === cartItemId);
        
        if (!itemToUpdate) return;
        
        const newCartItemId = `${itemToUpdate.id}-${newColor}`;
        const existingTargetItem = currentItems.find(item => item.cartItemId === newCartItemId);
        
        if (existingTargetItem && existingTargetItem.cartItemId !== cartItemId) {
          set({
            items: currentItems
              .map(item => 
                item.cartItemId === newCartItemId 
                  ? { ...item, quantity: item.quantity + itemToUpdate.quantity }
                  : item
              )
              .filter(item => item.cartItemId !== cartItemId)
          });
        } else {
          set({
            items: currentItems.map(item => 
              item.cartItemId === cartItemId
                ? { ...item, selectedColor: newColor, cartItemId: newCartItemId }
                : item
            )
          });
        }
      },
      clearCart: () => set({ items: [] }),
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      get totalPrice() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "mutiara-cell-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
