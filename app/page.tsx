import { Lid } from "@/components/Lid";
import { Kit } from "@/components/Kit";
import { SpecSheet } from "@/components/SpecSheet";
import { RiderStory } from "@/components/RiderStory";
import { Dispatch } from "@/components/Dispatch";
import { Footer } from "@/components/Footer";
import { products } from "@/lib/products";

// Schema.org structured data for products
function ProductStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products
      .filter((p) => p.status === "available")
      .map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.description,
          brand: {
            "@type": "Brand",
            name: "Wooster Core",
          },
          manufacturer: {
            "@type": "Organization",
            name: "Arty Design",
          },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: product.currency,
            availability: "https://schema.org/InStock",
          },
        },
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <ProductStructuredData />
      <Lid />
      <Kit />
      <SpecSheet />
      <RiderStory />
      <Dispatch />
      <Footer />
    </>
  );
}
