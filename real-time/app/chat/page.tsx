import { RealtimeChat } from "@/components/realtime-chat"


export default function ChatPage() {
    return (
        <>
            <main>
                <RealtimeChat roomName="AluthChat" username="jhon_doe"/>
            </main>
        </>
    )
}