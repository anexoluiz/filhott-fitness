/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useMemo } from "react";

import {
  Dumbbell,
  ShoppingCart,
  Sun,
  Moon,
  Plus,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const productsData = {
  shirts: [
    {
      id: 1,
      category: "shirts",
      name: "Camisa Básica Branca",
      price: 79.9,
      image: "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/outlet360/media/uploads/produtos/foto/dwaxlvgg/camiseta-diesel-basica-branca-4.jpg",
    },
    {
      id: 2,
      category: "shirts",
      name: "Regata Estampada Caveira",
      price: 89.9,
      image: "https://seuloza.com.br/wp-content/uploads/2023/07/REGATA-ESTAMPADA-100-ALGODAO-FITNESS-SEU-LOZA-VARIAS-CORES-CAVEIRA.jpg",
    },
    {
      id: 3,
      category: "shirts",
      name: "Camisa Manga Longa Preta",
      price: 99.9,
      image: "https://acdn-us.mitiendanube.com/stores/003/456/987/products/img_2957-copiar-1-670f02c297399b620c17081999155601-1024-1024.jpg",
    },
    {
      id: 4,
      category: "shirts",
      name: "Camisa Oversized Cinza",
      price: 119.9,
      image: "https://cdn.vnda.com.br/1000x/bulking/2024/10/21/12_14_16_989_1594186706_camiseta-oversized-strive-cinza-lan__amento-bulking__2.jpg?v=1729523656",
    },
  ],
  bottles: [
    {
      id: 1,
      category: "bottles",
      name: "Garrafa Térmica 1L Preta",
      price: 129.9,
      image: "https://images.tcdn.com.br/img/img_prod/1169820/garrafa_termica_aerolight_flast_flow_black_1_1l_stanley_2423_2_58f37ffbcaad8bba80f4e7b06f58bec1.jpg",
    },
    {
      id: 2,
      category: "bottles",
      name: "Squeeze de Treino 750ml",
      price: 49.9,
      image: "https://esportelegal.fbitsstatic.net/img/p/garrafa-squeeze-poker-aluminio-750ml-86094/297779.jpg?w=1000&h=1000&v=no-value",
    },
    {
      id: 3,
      category: "bottles",
      name: "Coqueteleira com Mola",
      price: 39.9,
      image: "https://cf.shopee.com.br/file/7112e40d19614a6708ae92e1d380e586",
    },
    {
      id: 4,
      category: "bottles",
      name: "Galão de Água 2.2L",
      price: 59.9,
      image: "https://m.media-amazon.com/images/I/51QBLKFKhJL._UF894,1000_QL80_.jpg",
    },
  ],
  supplements: [
    {
      id: 1,
      category: "supplements",
      name: "Whey Protein Concentrado",
      price: 159.9,
      image: "https://lojamaxtitanium.vtexassets.com/arquivos/ids/158618-1920-0/100-whey-protein-max-titanium-sleeve-900g-baunilha-1.jpg?v=638834572167370000",
    },
    {
      id: 2,
      category: "supplements",
      name: "Creatina Monohidratada 300g",
      price: 89.9,
      image: "https://lojamaxtitanium.vtexassets.com/arquivos/ids/157717/creatine-max-titanium-300g-1.jpg?v=638715246475830000",
    },
    {
      id: 3,
      category: "supplements",
      name: "Pré-Treino Nuclear Rush",
      price: 119.9,
      image: "https://images.tcdn.com.br/img/img_prod/971829/pre_treino_nuclear_rush_100g_bodyaction_235_1_d91597bec10d6d7ad0fac425ab18aff5.jpg",
    },
    {
      id: 4,
      category: "supplements",
      name: "Multivitamínico A-Z",
      price: 69.9,
      image: "https://images.tcdn.com.br/img/img_prod/748920/multivitaminico_e_mineral_a_z_pote_90_capsulas_pro_healthy_175_1_ddfb75008a2a3f51dc3e13cefa5cbad4.jpg",
    },
  ],
};

export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  cartItem: CartItem | undefined;
  onAddToCart: (product: Product) => void;
  onIncrement: (product: Product | CartItem) => void;
  onDecrement: (product: Product | CartItem) => void;
}

function ProductCard({
  product,
  cartItem,
  onAddToCart,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  return (
    <Card className="w-64 flex-shrink-0 border-none shadow-md hover:shadow-xl transition-shadow duration-300">
      <Dialog>
        <DialogTrigger asChild>
          <div className="overflow-hidden rounded-t-lg cursor-zoom-in">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-72 transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 border-0 max-w-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
      <CardContent className="p-4 text-center">
        <h3 className="text-md font-semibold">{product.name}</h3>
        <p className="mt-1 text-lg font-bold">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {cartItem ? (
          <div className="flex items-center justify-center w-full">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDecrement(cartItem)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 font-semibold text-lg">
              {cartItem.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onIncrement(cartItem)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button onClick={() => onAddToCart(product)} className="w-full">
            Adicionar ao Carrinho
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onIncrement: (product: Product | CartItem) => void;
  onDecrement: (product: Product | CartItem) => void;
}

function ProductSection({
  title,
  products,
  cartItems,
  onAddToCart,
  onIncrement,
  onDecrement,
}: ProductSectionProps) {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter mb-8">{title}</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4">
          {products.map((product: Product) => {
            const cartItem = cartItems.find(
              (item) =>
                item.id === product.id && item.category === product.category
            );
            return (
              <ProductCard
                key={`${product.category}-${product.id}`}
                product={product}
                cartItem={cartItem}
                onAddToCart={onAddToCart}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function StorePage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) =>
      prev.find((i) => i.id === product.id && i.category === product.category)
        ? prev.map((i) =>
            i.id === product.id && i.category === product.category
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { ...product, quantity: 1 }]
    );
  };

  const handleIncrement = (product: Product | CartItem) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === product.id && i.category === product.category
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const handleDecrement = (product: Product | CartItem) => {
    setCartItems((prev) => {
      const item = prev.find(
        (i) => i.id === product.id && i.category === product.category
      );
      if (item?.quantity === 1)
        return prev.filter(
          (i) => !(i.id === product.id && i.category === product.category)
        );
      return prev.map((i) =>
        i.id === product.id && i.category === product.category
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  };

  const totalCartItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );
  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="#" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />{" "}
            <span className="font-bold text-lg">Filhott Fitness</span>
          </a>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {totalCartItems > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {totalCartItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Seu Carrinho</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto pb-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center text-muted-foreground mt-10">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
                      <p>Seu carrinho está vazio.</p>
                    </div>
                  ) : (
                    <ul className="divide-y mx-8">
                      {cartItems.map((item) => (
                        <li
                          key={`${item.category}-${item.id}`}
                          className="flex items-center pb-4 space-x-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-24 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-muted-foreground">
                              R$ {item.price.toFixed(2).replace(".", ",")}
                            </p>
                            <div className="flex items-center mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDecrement(item)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-3 font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleIncrement(item)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="font-bold">
                            R${" "}
                            {(item.price * item.quantity)
                              .toFixed(2)
                              .replace(".", ",")}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {cartItems.length > 0 && (
                  <SheetFooter className="border-t pt-6">
                    <div className="w-full space-y-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Subtotal</span>
                        <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <SheetClose asChild>
                        <Button className="w-full cursor-not-allowed">Finalizar Compra</Button>
                      </SheetClose>
                    </div>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <ProductSection
          title="Camisas de Treino"
          products={productsData.shirts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <ProductSection
          title="Garrafas & Coqueteleiras"
          products={productsData.bottles}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <ProductSection
          title="Suplementos Essenciais"
          products={productsData.supplements}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Filhott Fitness. Todos os direitos
            reservados.
          </p>
          <p className="mt-2">
            Utilizando Next.js, React, Tailwind CSS, Radix UI, Lucide Icons e Shadcn UI. O site foi desenvolvido para fins puramente educacionais e os direitos referentes as imagens utilizadas pertencem aos seus respectivos donos.
          </p>
        </div>
      </footer>
    </div>
  );
}
