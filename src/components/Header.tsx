"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  // Access cart items from context
  const { cartItems } = useCart();

  const itemCount = cartItems.reduce(
    (acc: number, item: { quantity: number }) => acc + item.quantity,
    0
  );

  return (
    <header className="bg-amber-800 text-white p-4 shadow-md">
<div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-amber-200 transition-colors">
            Savory Delights
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-amber-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="hover:text-amber-200 transition-colors"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="hover:text-amber-200 transition-colors"
              >
                {/* Show how many items are in the cart */}
                Checkout ({itemCount})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
