import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Movie, MovieDto, MovieVideoDto } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  private apiKey: string = 'fcb839d77a6b536cae7c9f94d4264e86';

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getMovieVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  searchMovies(page: number) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvs(type: string = 'popular', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }
}
