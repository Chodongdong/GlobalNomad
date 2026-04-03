import PopularActivitiesList from "@/src/components/Card/PopularActivitiesList";

export default function PopularActivitiesSection() {
  return (
    <section className="w-full mb-16 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-primary-500 tracking-widest uppercase">
          Popular
        </p>
        <h2 className="text-h1 font-bold text-gray-950">인기 체험</h2>
      </div>
      <PopularActivitiesList />
    </section>
  );
}
