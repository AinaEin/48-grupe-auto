import { AutoCard } from "./AutoCard";
import style from "./AutoList.module.css";

export function NewestCarsList() {
  return (
    <section className={style.autoList}>
      <h1>NEWEST CARS LIST CONTENT</h1>
      <AutoCard />
      <AutoCard />
      <AutoCard />
      <AutoCard />
      <AutoCard />
      <AutoCard />
    </section>
  );
}
