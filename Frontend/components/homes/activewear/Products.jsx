"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts } from "@/api/product"; // Import the fetch function

const tabItems = ["Yoga", "Run", "Tennis", "Train", "Sale"];

export default function Products() {
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(); // Fetch products from API

      // console.log("test")
      // console.log(data)
      // console.log("sinha")
      setProducts(data);
    };

    getProducts();
  }, []);
  useEffect(() => {
    const getselectedItems = async () => {
      const data = await fetchProducts(); // Fetch products from API

      // console.log("test")
      // console.log(data)
      // console.log("sinha")
      setSelectedItems(data);
    };

    getselectedItems();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      document.getElementById("Yoga").classList.remove("filtered");
  //     console.log("test tesr")
  // console.log(selectedItems)
  // console.log("sinha")
  // console.log("test products")
  // console.log(products)
  // console.log("sinha")
      setTimeout(() => {
        setSelectedItems(
          products.filter((elm) => elm.tabFilterOptions.includes(activeItem))
        );
        document.getElementById("Yoga").classList.add("filtered");
      }, 300);
    }
  }, [activeItem, products]);



  // useEffect(() => {
  //   if (products.length > 0) {
  //     document.getElementById("Yoga")?.classList.remove("filtered");
  
  //     setTimeout(() => {
  //       setSelectedItems((prev) =>
  //         products.filter((elm) => elm.tabFilterOptions.includes(activeItem))
  //       );
  //       document.getElementById("Yoga")?.classList.add("filtered");
  //     }, 300);
  //   }
  // }, [activeItem, products]);
  

  // console.log("test tesr")
  // console.log(selectedItems)
  // console.log("sinha")

  
  return (
    <section className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3>Today's Top Picks</h3>
          <ul className="tab-product-v2 justify-content-sm-center" role="tablist">
            {tabItems.map((item, i) => (
              <li key={i} className="nav-tab-item" role="presentation">
                <a
                  className={activeItem === item ? "active" : ""}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    setActiveItem(item);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flat-animate-tab">
          <div className="tab-content">
            <div className="tab-pane active show tabFilter filtered" id="Yoga" role="tabpanel">
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
              {selectedItems.length > 0 ? (
                  selectedItems.map((product, index) => (
                    <ProductCard1 key={index} product={product} />
                  ))
                ) : (
                  <p>No products found for {activeItem}</p>
                )}
              </div>
              <div className="sec-btn text-center">
                <Link href={`/shop-default-list`} className="btn-line">
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
