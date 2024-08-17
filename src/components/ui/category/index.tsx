import Link from "next/link";
import React from "react";
import styles from "./category.module.scss";
import Image from "next/image";

function CategoryCard({ category }: any) {
  return (
    <Link
      className={styles.container_category_card}
      href={`/specific-category/${category.id}`}
      key={category.id}
    >
      <div className={styles.title}>{category.name}</div>

      <div className={styles.image_wrapper}>
        <Image
          src={category.icons[0]?.url}
          alt={category.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Link>
  );
}

export default CategoryCard;
