import { useState } from "react"
import { MessageSquare } from "lucide-react"
import ChatPanel from "../domain/ChatPanel"

export default function ChatFab(){
  const [open,setOpen] = useState(false)
  return (
    <>
      <button
        onClick={()=>setOpen(true)}
  className="fixed bottom-5 right-5 z-40 rounded-full accent-bg-solid shadow-lg hover:shadow-xl hover:scale-105 transition p-4"
        title="Open Progress Assistant"
      >
        <MessageSquare size={22}/>
      </button>
      <ChatPanel open={open} onClose={()=>setOpen(false)}/>
    </>
  )
}
