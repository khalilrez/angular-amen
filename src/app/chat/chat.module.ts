import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { ChatService } from '../chat.service';
import { AngularMaterialModule } from '../angular-material.module';



@NgModule({
  declarations: [
    ChatDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports:[ChatDialogComponent],
  providers:[ChatService]
})
export class ChatModule { }
