export class ConcertModel {
  date: string;
  startTime: string;
  place: string;
  city: string;
  departure: string;

  constructor(
    date: string,
    startTime: string,
    place: string,
    city: string,
    departure: string
  ) {
    this.date = date;
    this.startTime = startTime;
    this.place = place;
    this.city = city;
    this.departure = departure;
  }
}
