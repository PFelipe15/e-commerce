'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterAction from './_actions/register';
 
export default function Register() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    phone: '',
    name: ''
  });

  const [addressData, setAddressData] = useState({
    street: '',
    numberHouse: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setAddressData({
        ...addressData,
        [addressField]: value,
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
 
 

    RegisterAction({ UserData: userData, AddressData: addressData });
  };


  return (
    <div className="container flex p-4 justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm md:max-w-xl">
        <Tabs defaultValue='personal'   >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
                <CardDescription>
                  Insira suas informações pessoais. Clique em salvar quando terminar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email *</Label>
                  <Input   id="email" name="email" type="email" required onChange={handleInputChange} value={userData.email} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Senha *</Label>
                  <Input id="password" name="password" type="password" required onChange={handleInputChange} value={userData.password} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input id="phone" name="phone" type="tel" required onChange={handleInputChange} value={userData.phone} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Nome (opcional)</Label>
                  <Input id="name" name="name" onChange={handleInputChange} value={userData.name} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Salvar Dados</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="address">
            <Card>
              <CardHeader>
                <CardTitle>Endereço</CardTitle>
                <CardDescription>
                  Insira as informações do seu endereço. Clique em salvar quando terminar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="street">Rua (opcional)</Label>
                  <Input id="street" name="address.street" onChange={handleInputChange} value={addressData.street} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="number">Número (opcional)</Label>
                  <Input id="number" name="address.numberHouse" type="number" onChange={handleInputChange} value={addressData.numberHouse} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">Cidade (opcional)</Label>
                  <Input id="city" name="address.city" type='string'  onChange={handleInputChange} value={addressData.city} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">Estado (opcional)</Label>
                  <Input id="state" name="address.state" onChange={handleInputChange} value={addressData.state} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="zipCode">CEP (opcional)</Label>
                  <Input id="zipCode" name="address.zipCode" onChange={handleInputChange} value={addressData.zipCode} />
                </div>
              </CardContent>
           
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
