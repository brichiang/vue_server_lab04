<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>Status</div>
    <input type="text" placeholder="username" v-model="username"/>
    <input type="text" placeholder="type message here" v-model="msg"/>
    <button @click="SendMessage">Send</button>
    
    <div v-for="m in allMsgs">
      {{m.username}}-{{m.msg}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import io from "socket.io-client";

export default {
  name: 'home',
  data(){
    return {
      socket:io("localhost:8880"),
      msg:"",
      allMsgs:[],
      username:"default"
    }
  },
  mounted(){
    this.socket.on("user_connected", (data)=>{
      //alert("Amy Yulim SEO is short!");
    });
    this.socket.on("new_msg", (data)=>{
      this.allMsgs.unshift(data);
    });
  },
  methods:{
    SendMessage: function(){
      var obj ={
        username: this.username,
        msg: this.msg
      }
      this.socket.emit("typed_msg", obj)
    }
  }
}
</script>
