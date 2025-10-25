// app/_components/UploadForm.tsx
"use client";

export default function UploadForm() {
  function onSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO: 실제 저장 로직 (이미 로그인된 상태라는 전제)
  }

  function onClickDropZone() {
    // TODO: 파일 선택/드롭존 열기 등 (이미 로그인된 상태라는 전제)
  }

  return (
    <form onSubmit={onSave} className="px-10 pt-10 pb-10 max-w-3xl mx-auto space-y-6">
      <h1 className="text-lg font-bold uppercase">Write</h1>

      <section
        onClick={onClickDropZone}
        className="border rounded-lg p-4 h-48 flex items-center justify-center text-neutral-500 hover:bg-neutral-100/40 cursor-pointer transition"
      >
        Click or Drop Images Here
      </section>

      <div className="space-y-4 text-sm">
        <div>
          <label className="block mb-1 uppercase tracking-wide text-neutral-500">Date</label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 uppercase tracking-wide text-neutral-500">Location</label>
          <input type="text" placeholder="Seoul, Korea" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 uppercase tracking-wide text-neutral-500">Description</label>
          <textarea rows={4} className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-6 py-3 bg-black text-white rounded uppercase tracking-wide hover:opacity-80">
          Save
        </button>
      </div>
    </form>
  );
}