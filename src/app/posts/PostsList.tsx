// import type { NextApiRequest, NextApiResponse } from "next";
// import {connection} from "../../../databaseConnection";
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   let message;
//   if (req.method === "GET") {
//     const products = await query({
//       query: "SELECT * FROM posts",
//       values: [],
//     });
//     res.status(200).json({ products: products });
//   }
//
// export default async function TicketList() {
//   const tickets = await getTickets()
//
//   return (
//       <>
//         {tickets.map((ticket) => (
//             <div key={ticket.id} className="card my-5">
//               <h3>{ticket.title}</h3>
//               <p>{ticket.body.slice(0, 200)}...</p>
//               <div className={`pill ${ticket.priority}`}>
//                 {ticket.priority} priority
//               </div>
//             </div>
//         ))}
//         {tickets.length === 0 && (
//             <p className="text-center">There are no open tickets, yay!</p>
//         )}
//       </>
//   )
