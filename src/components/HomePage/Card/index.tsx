"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";
import styles from "./card.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useCardCollapse } from "./cardCollapseContext";
import {
  easeOutExpoTransition,
  blurFadeVariant,
  titleTransitionVariant,
  titleTransitionParams
} from "@/components/Animations/AnimatePresenceComponent";

export type CardProps = {
  title?: string;
  subtitle?: string;
  contentPending?: boolean;
} & React.HTMLProps<HTMLDivElement>;

export default function Card(props: CardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { onCollapse } = useCardCollapse();

  const toggleOpen = (e?) => {
    e?.preventDefault();
    setIsOpen(!isOpen);
    if (isOpen) {
      onCollapse();
    }
  };

  const cn = [
    props.className,
    styles.defaultCard,
    props.title && isOpen
      ? styles.extraCardPadding
      : styles.closedCardPadding
  ].join(" ");

  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      id="__card"
      className={cn + (isFocused ? " focused" : " unfocused")}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (e.target.id === "__dropdown-btn") {
          setIsFocused(false);
        }
      }}
    >
      {props.title && (
        <CardTitle
          {...(props as Required<CardProps>)}
          isOpen={isOpen}
          onClick={toggleOpen}
        />
      )}
      {props.subtitle && (
        <CardSubtitle {...(props as Required<CardProps>)} />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="__card-children"
            className="box-border !overflow-visible relative"
            initial="closed"
            animate="open"
            exit="closed"
            variants={blurFadeVariant}
            transition={easeOutExpoTransition}
            data-testid="card-children"
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const CardSubtitle = ({ subtitle }: { subtitle: string }) => {
  return (
    <motion.div
      key={subtitle}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="card-subtitle"
      transition={titleTransitionParams}
      variants={titleTransitionVariant}
      className="px-1"
    >
      <h2 className="pl-6 pb-2 -mx-3 text-zinc-400">{subtitle}</h2>
    </motion.div>
  );
};

export const Loading = () => {
  return (
    <span
      className="pl-2 text-red-500 text-lg"
      data-testid="card-pending"
    >
      <span className={`${styles.dot} ${styles.dot1}`}>●</span>
      <span className={`${styles.dot} ${styles.dot2}`}>●</span>
      <span className={`${styles.dot} ${styles.dot3}`}>●</span>
    </span>
  );
};

const CardTitle = ({
  title,
  onClick,
  contentPending,
  isOpen
}: {
  title: string;
  onClick?: () => void;
  contentPending?: boolean;
  isOpen: boolean;
}) => {
  return (
    <button
      className="flex items-center -mx-3 px-1 pt-2 text-left w-full"
      onClick={onClick}
      data-testid="toggle-button"
    >
      <FontAwesomeIcon
        className={`${styles.icon} w-4 pr-2 icon`}
        size="lg"
        icon={isOpen ? faAngleDown : faAngleUp}
      />
      <motion.div
        key={title}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={titleTransitionParams}
        variants={titleTransitionVariant}
        className="max-w-[98%]"
      >
        <h1 className="text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
          {contentPending && <Loading />}
        </h1>
      </motion.div>
    </button>
  );
};
