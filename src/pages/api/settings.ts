import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mockData from "../../data/mock.json";

const directory = path.join(__dirname, "../mock1.json");

export async function handler(request: NextRequest) {
  if (request.method === "POST") {
    const body = await request.json();
    fs.writeFileSync(directory, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json(body);
  }

  if (request.method === "GET") {
    try {
      const file = fs.readFileSync(directory, { encoding: "utf-8" });
      return NextResponse.json(JSON.parse(file));
    } catch (error) {
      return NextResponse.json(mockData);
    }
  }
}
