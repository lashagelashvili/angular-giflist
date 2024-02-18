import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Gif } from '../interfaces';
import { of } from 'rxjs';

export interface GifsState {
  gifs: Gif[];
}

@Injectable({ providedIn: 'root' })
export class RedditService {
  // state
  private state = signal<GifsState>({
    gifs: [],
  });

  // selectors
  gifs = computed(() => this.state().gifs);

  // sources
  gifsLoaded$ = of([
    {
      src: '',
      author: '',
      name: '',
      permalink: '',
      title: 'test gif',
      thumbnail: '',
      comments: 0,
    },
  ]);

  constructor() {
    //reducers
    this.gifsLoaded$.pipe(takeUntilDestroyed()).subscribe((gifs) =>
      this.state.update((state) => ({
        ...state,
        gifs: [...state.gifs, ...gifs],
      }))
    );
  }
}
