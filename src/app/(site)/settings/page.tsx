import dynamic from "next/dynamic";
const AceEditorContainer = dynamic(
  () => import("@/components/UserDataSettings"),
  {
    ssr: false,
  }
);
export default function Settings() {
  return (
    <div className="p-4">
      <AceEditorContainer />
    </div>
  )
}
