import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatList } from './chat-list';

@NgModule({
  declarations: [
    ChatList,
  ],
  imports: [
    IonicPageModule.forChild(ChatList),
  ],
  exports: [
    ChatList
  ]
})
export class ChatListModule {}
