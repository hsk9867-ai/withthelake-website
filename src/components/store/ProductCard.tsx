import Image from "next/image";
import { IconExternal } from "@/components/Icons";
import { formatPrice, type Product } from "@/content/products";

export default function ProductCard({ product }: { product: Product }) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noreferrer"
      className="card card-hover group flex h-full flex-col overflow-hidden"
      aria-label={`${product.brand} ${product.name} — 네이버 스마트스토어에서 보기`}
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width:1024px) 300px, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="t-meta absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[13px] font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="t-meta text-[13px] font-semibold text-accent-deep">
          {product.brand} · {product.category}
        </p>
        <p className="mt-2 text-[17px] font-bold leading-snug text-ink group-hover:text-primary">{product.name}</p>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-4">
          {discount > 0 && <span className="font-display text-[15px] font-semibold text-danger">{discount}%</span>}
          <span className="font-display text-[20px] font-bold text-ink">{formatPrice(product.price)}</span>
          {product.originalPrice && discount > 0 && (
            <span className="text-[14px] text-muted line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <span className="t-meta mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary">
          스마트스토어에서 구매 <IconExternal size={14} />
        </span>
      </div>
    </a>
  );
}
