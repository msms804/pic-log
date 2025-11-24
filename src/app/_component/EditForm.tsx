// app/_components/EditForm.tsx
"use client";

type Props = {
  initial?: { date?: string; location?: string; description?: string };
};

export default function EditForm({ initial }: Props) {
  return (
    <div className="px-10 pt-10 pb-10 max-w-3xl mx-auto space-y-10">
      <h1 className="text-xl font-bold uppercase">Edit</h1>

      {/* 업로드 미리보기/교체 영역 등 */}
      <section className="border rounded-lg p-6 h-40 flex items-center justify-center text-neutral-500">
        Existing images…
      </section>

      <div className="space-y-6 text-sm">
        <div>
          <label className="block mb-1 uppercase tracking-wide text-neutral-500">Date</label>
          <input defaultValue={initial?.date} type="date" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 uppercase tracking-wide text-neutral-500">Location</label>
          <input defaultValue={initial?.location} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 uppercase tracking-wide text-neutral-500">Description</label>
          <textarea defaultValue={initial?.description} rows={4} className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <button className="px-6 py-3 bg-black text-white rounded uppercase tracking-wide hover:opacity-80">
        Update
      </button>
    </div>
  );
}