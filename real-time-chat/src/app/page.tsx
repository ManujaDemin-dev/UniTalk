import {LogoutButton} from "@/components/logout-button";
import { RealtimeChat } from "@/components/realtime-chat";


export default function Home() {
  return (
    <>
    hwllo world
    <LogoutButton/>
    <main>
      <RealtimeChat roomName="my-chatak" username="jhon doe"/>
    </main>
    </>
  )
}
