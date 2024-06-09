import styles from "./EmptyList.module.scss";

interface IProps {
  variant: "all" | "active" | "completed";
}
export const EmptyList = ({ variant }: IProps) => {
  return <li className={styles.emptyPreview}>{texts[variant]}</li>;
};

const texts: Record<IProps["variant"], string> = {
  all: "There are no planned todos yet",
  active: "Currently, there are no active todos",
  completed: "Currently, there are no completed todos.",
};
