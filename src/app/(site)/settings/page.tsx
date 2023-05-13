import dynamic from "next/dynamic";
const AceEditorContainer = dynamic(() => import("@/components/UserDataSettings"), {
  ssr: false,
});
export default function Settings() {
  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <AceEditorContainer />
    </main>
  );
}
