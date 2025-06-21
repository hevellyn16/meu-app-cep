import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";

import { fetchCepData } from "~/services/API";
import { CepData } from "~/types/cep";

const CepSearch = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<CepData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarCep = async () => {
    setError('');
    setEndereco(null);

    if (cep.length !== 8 || !/^\d+$/.test(cep)) {
      Alert.alert("Erro", "CEP deve ter 8 dígitos válidos (somente números).");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchCepData(cep);
      setEndereco(data); 
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || 'Erro ao buscar o CEP. Tente novamente mais tarde.');
      } else {
        setError('Erro desconhecido ao buscar o CEP. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-100">
      <Text className="text-3xl font-bold mb-8 text-gray-800">Consulta de CEP</Text>

      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-5 text-lg bg-white shadow-sm"
        placeholder="Digite o CEP (somente números)"
        keyboardType="numeric"
        maxLength={8}
        value={cep}
        onChangeText={setCep}
      />

      <Button title="Buscar CEP" onPress={buscarCep} disabled={loading} color="#007bff" />

      {loading && <ActivityIndicator size="large" color="#0000ff" className="mt-5" />}

      {error ? (
        <Text className="text-red-500 mt-8 text-base text-center">{error}</Text>
      ) : (
        endereco && ( 
          <View className="mt-8 w-full py-4 bg-blue-50 rounded-xl border border-blue-200 shadow-md">
            <View className="flex-row items-start py-4 justify-between px-6 mb-4">
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">CEP:</Text> {endereco.cep}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">Logradouro:</Text> {endereco.logradouro}</Text>
                {endereco.complemento && ( 
                    <Text className="text-lg mb-2 text-gray-700">
                    <Text className="font-bold">Complemento:</Text> {endereco.complemento}
                    </Text>
            )}
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">Unidade:</Text> {endereco.unidade}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">Bairro:</Text> {endereco.bairro}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">Cidade:</Text> {endereco.localidade}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">UF:</Text> {endereco.uf}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">IBGE:</Text> {endereco.estado}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">DDD:</Text> {endereco.regiao}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">SIAFI:</Text> {endereco.ibge}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">GIA:</Text> {endereco.gia}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">DDD:</Text> {endereco.ddd}</Text>
                <Text className="text-lg mb-2 text-gray-700"><Text className="font-bold">SIAFI:</Text> {endereco.siafi}</Text>

            </View>
                
          </View>
        )
      )}
    </View>
  );
};

export default CepSearch;