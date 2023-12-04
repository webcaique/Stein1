import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import estilos from './style';

export default function Rota({distancia, duracao}) {
  useEffect(() => {
    //Fica calculando quanto tempo demora para chegar no local pesquisado
    setInterval(() => {
      let hours = new Date().getHours();
      hours < 10 && (hours = `0${hours}`);

      let min = new Date().getMinutes();
      min < 10 && (min = `0${min}`);
    }, 1000);
  }, []);
  return (
    <View style={estilos.rotaContainer}>
      {distancia && duracao ? (
        <View style={estilos.cotainerInformacoes}>
          <Text style={estilos.horarioDeChegada}>
            {distancia != '' && duracao != '' ? 'HORÁRIO' : ''}
          </Text>
          <View style={estilos.informacoes}>
            <Text style={estilos.info}>{Math.floor(distancia)} km</Text>
            {distancia != '' && duracao != '' ? (
              <Image
                // Botão para pesquisar a localização
                style={estilos.gps}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FsetaDupla.png?alt=media&token=dfea1622-866e-48fe-af24-28a86f4bc3b4&_gl=1*nkjql1*_ga*MTYxMTc4NjMxOC4xNjk3OTI5MTAy*_ga_CW55HF8NVT*MTY5NzkzMTEyMC4yLjEuMTY5NzkzMTkzMy4zOS4wLjA.',
                }}
                width={40}
                height={40}
                resizeMode="contain"
              />
            ) : (
              ''
            )}
            <Text style={estilos.info}>
              {`${
                duracao < 60
                  ? `${parseInt(duracao) + 1} min`
                  : `${parseInt(duracao / 60)} horas \n ${
                    (parseInt
                      (
                        (
                          (
                            (duracao/60)
                            ) - (
                              (parseInt(duracao/60).toString().split("."))[0] )
                              )*60)+1)} mins`
              }`}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
