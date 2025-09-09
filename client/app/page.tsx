'use client'

import axios from "axios";
import { useState } from "react";

export default function Home() {


	const [data, setData] = useState <string | null>(null)

	const call_gRPC = async () => {
		try {
			const response = await axios.get('http://localhost:4000/hello/Abdullah')
			setData(response.data.message)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="font-sans flex bg-neutral-100 text-neutral-900 justify-around min-h-screen">
			<div className="max-w-4xl">
				<button type="button" className="bg-blue-400 p-2 rounded-md cursor-pointer" onClick={call_gRPC}>
					Send Request
				</button>

				{data && (
					<div className="">
						{data}
					</div>
				)}
			</div>
		</div>
	);
}
