import axios from "axios";
import {React, useEffect, useState } from "react";
import Echo from 'laravel-echo';
import Larasocket from 'larasocket-js';
window.Echo = new Echo({
    broadcaster: Larasocket,
    token: "2176|nduz7KeOGvHhRjYMgFBZt09d9DrgLwU5j1yeB5rz",
});
window.Echo.channel('chat').listen('MessageSentEvent', (e) => {
    console.log("e : " , e);
  })
export default function Chat() {
    const [Message, setMessage] = useState(null);
    useEffect(() => {
      
    }, [])
    return (
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2>Messages</h2>
    
                <div
                    class="clearfix"
                    v-for="message in messages"
                >
                  {/* </div>  @{{ message.user.name }}: @{{ message.message }} */}
                </div>
    
                <div class="input-group">
                    <input
                        type="text"
                        name="message"
                        class="form-control"
                        placeholder="Type your message here..."
                        v-model="newMessage"
                    //    @keyup.enter="sendMessage"
                   />
    
                    <button
                        class="btn btn-primary"
                      //  @click="sendMessage"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}
