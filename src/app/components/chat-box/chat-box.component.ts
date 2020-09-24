import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from 'src/app/services/auth.service';
import {MessageService} from 'src/app/services/message.service';
import {Sound, SoundService} from 'src/app/services/sound.service';
import {UtilService} from 'src/app/services/util.service';
import {Game, Message, TeamTypes} from 'types';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  @Input() game: Game;

  chatShown = false;
  unreadMessages?: number;
  newMessage: string;
  messages$: Observable<Message[]>;

  constructor(
      public readonly authService: AuthService,
      private readonly messageService: MessageService,
      private readonly utilService: UtilService,
      private readonly soundService: SoundService,
  ) {}

  ngOnInit() {
    this.messages$ =
        this.messageService.getSpymasterMessages(this.game.id)
            .pipe(tap(messages => {
              if (messages && messages.length) {
                const lastMessage = messages[messages.length - 1];

                // don't let the chat box make sounds on the first load
                if (this.unreadMessages === undefined) {
                  this.unreadMessages = 0;
                }

                // badge and play sound when the chat box is not shown so long
                // as the incoming message isn't generated by the server
                else if (!this.chatShown && !lastMessage.fromServer) {
                  this.unreadMessages++;
                  this.soundService.play(Sound.NEW_MESSAGE);
                }

                this.scrollToBottom();
              }
            }));
  }

  get placeholder(): string {
    return this.game && this.game.completedAt ?
        'Click here to see the spymaster chat' :
        'Click here to chat with the other spymaster';
  }

  setChatOpen(open = true) {
    this.chatShown = open;

    // clear the unread message count
    if (open) {
      this.unreadMessages = 0;
    }

    // scroll the chat to the bottom when you hide it so you can still see the
    // newest message above the chat box
    // we need to wait to do this until after the hide animation completes
    else {
      this.scrollToBottom(200);
    }
  }

  toggleChat() {
    this.setChatOpen(!this.chatShown);
  }

  sendMessage() {
    // when the game is over, just toast and don't send the message
    if (this.game.completedAt) {
      this.utilService.showToast(
          'Messages cannot be sent after the game is over');
    }

    // when the game is ongoing, messages will be sent in the chat
    else {
      const {currentUserId: userId} = this.authService;
      const team = this.game.blueTeam.userIds.includes(userId) ?
          TeamTypes.BLUE :
          TeamTypes.RED;

      this.messageService.sendSpymasterMessage(this.game.id, {
        text: this.newMessage,
        userId,
        team,
      });
    }

    delete this.newMessage;
  }

  scrollToBottom(timeout = 0): void {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
            this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) {
      }
    }, timeout);
  }
}
