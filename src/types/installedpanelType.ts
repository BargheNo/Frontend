export interface installedpanel {
  name: string;
  customer: { id: number; firstName: string; lastName: string };
  power: number;
  address: {
    ID: number;
    province: string;
    city: string;
    streetAddress: string;
    postalCode: string;
    houseNumber: string;
    unit: number;
  };
}
