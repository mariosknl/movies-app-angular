import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  imagesSizes = IMAGES_SIZES;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    });
  }

  ngOnDestroy(): void {
    this.movie = null;
    this.movieVideos = [];
    this.movieImages = null;
    this.movieCredits = null;
  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((movieImagesData) => {
      this.movieImages = movieImagesData;
    });
  }

  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id).subscribe((movieVideosData) => {
      this.movieVideos = movieVideosData;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) => {
      this.movieCredits = movieCreditsData;
    });
  }
}
