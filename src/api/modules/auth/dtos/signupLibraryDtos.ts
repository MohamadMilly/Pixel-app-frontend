export type SignupLibraryRequestDto = {
  username: string;
  password: string;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  pagePrice: number;
  extraFees: number;
  planId: number;
  firstname?: string | undefined;
  lastname?: string | undefined;
};
