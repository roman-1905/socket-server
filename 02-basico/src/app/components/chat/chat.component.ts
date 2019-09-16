import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { timeout } from 'q';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubcription: Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubcription = this.chatService.getMessages().subscribe(msg => {

      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      });
  

    });

  }

  ngOnDestroy(): void {

    this.mensajesSubcription.unsubscribe();

  }

  enviar() {
    if (this.texto.trim().length === 0 ) {
      return;
    }


    this.chatService.sendMessage(this.texto);
    console.log(this.texto);
    this.texto = '';
  }
}
