import { Component, Input, inject } from '@angular/core';
import { Gif } from '../../shared/interfaces';
import { GifPlayerComponent } from './gif-player.component';
import { WINDOW } from '../../shared/utils/injection-token';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-gif-list',
  template: `
    @for (gif of gifs; track gif.permalink){
    <div>
      <app-gif-player
        [src]="gif.src"
        [thumbnail]="gif.thumbnail"
        data-testid="gif-list-item"
      ></app-gif-player>
      <mat-toolbar color="primary">
        <span>{{ gif.title }}</span>
        <span class="toolbar-spacer"></span>
        <button
          mat-icon-button
          (click)="window.open('https://reddit.com/' + gif.permalink)"
        >
          <mat-icon>comment</mat-icon>
        </button>
      </mat-toolbar>
    </div>
    } @empty {
    <p>Can't find any gifs 🤷</p>
    }
  `,
  imports: [
    GifPlayerComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  styles: [
    `
      div {
        margin: 1rem;
        filter: drop-shadow(0px 0px 6px #0e0c1ba8);
      }

      mat-toolbar {
        white-space: break-spaces;
      }

      p {
        font-size: 2em;
        width: 100%;
        text-align: center;
        margin-top: 4rem;
      }
    `,
  ],
})
export class GifListComponent {
  @Input({ required: true }) gifs!: Gif[];

  window = inject(WINDOW);
}
