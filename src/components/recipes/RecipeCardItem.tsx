import Link from 'next/link';
import { Clock, ChefHat } from 'lucide-react';
import StoreImage from '@/components/store/StoreImage';
import type { RecipeCard } from '@/lib/store/types';

// Recipe card for the /recipes grid — image-led, with the two facts a cook
// scans for first: how long, and how hard.
export default function RecipeCardItem({
  recipe,
  priority = false,
}: {
  recipe: RecipeCard;
  priority?: boolean;
}) {
  const href = `/recipes/${recipe.slug}/`;
  return (
    <article className="group h-full">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper shadow-sm transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-md"
      >
        <StoreImage
          src={recipe.hero_image}
          alt={recipe.title}
          width={1300}
          height={866}
          priority={priority}
          className="aspect-[3/2] w-full"
          imgClassName="transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
        />
        <div className="flex flex-1 flex-col p-5">
          <p className="eyebrow eyebrow-bare text-ink-faint">{recipe.recipe_type}</p>
          <h3 className="mt-1.5 font-display text-xl leading-snug text-ink transition-colors group-hover:text-yellow-ink">
            {recipe.title}
          </h3>
          {recipe.subtitle && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
              {recipe.subtitle}
            </p>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-forest" strokeWidth={1.8} />
              <span className="tnum">{recipe.total_min} min</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ChefHat className="h-4 w-4 text-forest" strokeWidth={1.8} />
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
