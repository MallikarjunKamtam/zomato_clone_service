export interface IGetRestaurent {
  id: number;
  name: string;
  isOpen: boolean;
  location: string;
  phoneNumber: number;
  email: string;
  timings: {
    open: string;
    close: string;
  };
  ownerName: string;
  rating: number;
  menu: number[];
}
