import { AutoCard } from './AutoCard';

export function NewestCarsList() {
    return (
        <section className="container">
            <h1>Newest cars for sale</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                <AutoCard />
                <AutoCard />
                <AutoCard />
                <AutoCard />
                <AutoCard />
                <AutoCard />
            </div>
        </section>
    );
}
