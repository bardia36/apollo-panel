import { motion } from "motion/react";
import { useState } from "react";
import { LazyImage } from "./lazy-image";
import { RequestCommonInfo } from "@/types/expert-requests";
import carPlaceholder from "@/assets/images/expert-requests/car-img-placeholder.webp";
import licensePlaceholder from "@/assets/images/expert-requests/license-card-placeholder.webp";

// Animation configurations
const SPRING_CONFIG = { type: "spring", stiffness: 300, damping: 30 } as const;
const CARD_OVERLAP = 80; // Horizontal spacing when revealed

// Calculate angles based on index and total number of cards
const getCardAngles = (index: number, total: number, isRevealed: boolean) => {
  if (isRevealed) {
    // When revealed, cards are spread out horizontally with gentle angles
    return {
      rotate: -5 + index * 3, // Slight progressive tilt from left to right
      x: index * CARD_OVERLAP - ((total - 1) * CARD_OVERLAP) / 2, // Center the spread
      y: 0,
      scale: 1,
      zIndex: total - index,
    };
  }

  // When stacked (not revealed)
  const baseAngle = -20;
  const angleIncrement = 70 / (total - 1); // Steeper angle progression
  return {
    rotate: baseAngle + index * angleIncrement,
    x: index * 2, // Minimal horizontal offset
    y: index * -2, // Slight vertical stacking
    scale: 0.98,
    zIndex: total - index,
  };
};

// Utility function to combine class names
const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Components
type CardItem = {
  isLicense?: boolean;
} & RequestCommonInfo;

type CardItemProps = {
  item: CardItem;
  itemsLength: number;
  index: number;
  isRevealed: boolean;
};

const CardItem = ({ itemsLength, item, index, isRevealed }: CardItemProps) => {
  const angles = getCardAngles(index, itemsLength, isRevealed);
  const placeholder = item.isLicense ? licensePlaceholder : carPlaceholder;

  return (
    <motion.div
      className={cn(
        "w-[130px] h-[90px] border bg-background p-1 rounded-2xl shadow-lg overflow-hidden min-w-[130px]",
        !isRevealed ? "absolute" : undefined,
        "hover:shadow-xl transition-shadow"
      )}
      layoutId={`card-item-${item.title + index}`}
      animate={{
        rotate: angles.rotate,
        x: angles.x,
        y: angles.y,
        scale: angles.scale,
        zIndex: angles.zIndex,
      }}
      transition={SPRING_CONFIG}
      whileHover={isRevealed ? { scale: 1.1, zIndex: 100 } : undefined}
    >
      <div className="size-full rounded-xl relative">
        <LazyImage
          src={item.path}
          alt={item.title}
          width="100%"
          height="100%"
          fit="cover"
          className="h-full"
          placeholder={placeholder}
        />
      </div>
    </motion.div>
  );
};

interface CardStackProps {
  itemsLength: number;
  items: CardItem[];
  isRevealed: boolean;
}

const CardStack = ({ items, isRevealed }: CardStackProps) => (
  <div
    className={
      isRevealed
        ? "w-full h-[90px] flex items-center justify-center relative"
        : "w-[130px] h-[90px] flex items-center justify-center"
    }
  >
    {items?.map((item, index) => (
      <CardItem
        key={item.title + index}
        item={item}
        itemsLength={items.length}
        index={index}
        isRevealed={isRevealed}
      />
    ))}
  </div>
);

// Main component
interface CollapsableCardsProps {
  items: CardItem[];
}

const CollapsableCards = ({ items }: CollapsableCardsProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleMouseEnter = () => setIsRevealed(true);
  const handleMouseLeave = () => setIsRevealed(false);

  return (
    <div
      className="relative flex items-center justify-center rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardStack
        itemsLength={items.length}
        items={items}
        isRevealed={isRevealed}
      />
    </div>
  );
};

export default CollapsableCards;
