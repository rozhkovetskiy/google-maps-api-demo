export class ReviewsModel {
  profile_photo_url: string;
  author_name: string;
  rating: string;
  relative_time_description: string;
  text: string;

  constructor(data: any = {}) {
    this.profile_photo_url = data.profile_photo_url || '';
    this.author_name = data.author_name || '';
    this.rating = data.rating || '';
    this.relative_time_description = data.relative_time_description || '';
    this.text = data.text || '';
  }
}
