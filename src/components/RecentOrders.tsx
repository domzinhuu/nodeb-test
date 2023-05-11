import userMockData from "@/data/userData";
import { FiSend } from "react-icons/fi";

function RecentOrders() {
  const userData: any = userMockData;
  const data = Object.keys(userData).map((key) => {
    const item = {
      cnpj: key,
      ...userData[key],
    };
    return item;
  });

  return (
    <>
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white  overflow-y-scroll">
        <h1>Últimos Pagamentos</h1>

        <ul>
          {data.map((item, id) => (
            <li
              key={id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
            >
              <div className="bg-purple-100 rounded-lg p-3">
                <FiSend className="text-purple-800" />{" "}
              </div>
              <div className="pl-4">
                <p className="text-gray-800 font-bold">$5225,54</p>
                <p className="text-gray-400 text-sm">Adquirente {id + 1}</p>
              </div>
              <p className="lg:flex md:hidden  absolute right-6 text-sm">
                {20 - id}/05/2023
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecentOrders;
