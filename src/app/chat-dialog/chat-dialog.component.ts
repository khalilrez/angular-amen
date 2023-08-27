import { Component } from '@angular/core';
import { Message, ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent {
  messages: Message[] = [];
  value: string = '';
  filteredSuggestions: string[] = [];
  showAutocomplete: boolean = false;

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });

    this.filteredSuggestions = this.chatService.chatbotResponses;
  }

  handleInput() {
    this.filteredSuggestions = this.chatService.chatbotResponses.filter(question =>
      question.toLowerCase().includes(this.value.toLowerCase())
    );
    this.showAutocomplete = this.value !== '';
  }

  selectAutocompleteItem(suggestion: string) {
    this.value = suggestion;
    this.showAutocomplete = false;
  }

  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
    this.filteredSuggestions = [];
  }
}
