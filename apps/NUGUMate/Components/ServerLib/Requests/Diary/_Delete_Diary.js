/*
작성자: 김창희
작성일: 2019/11/24
사용자가 조회한 날짜의 일기를 데이터 베이스에서 삭제하는 함수입니다.
*/
import { Alert } from 'react-native';
import axios from 'axios'; 
import {server,deviceStorage} from '../../config';

export default _Delete_Diary = async(state, _onSetState) => {
    var url = server.serverURL + '/Diary/Delete_Daily_Diary';  

    _onSetState({
        isLoading: true, 
        What: "일기 삭제 중"
    })   

    let diaries = await deviceStorage.getItem("diaries"); 
    delete diaries[state.selectedDate]; 
    await deviceStorage.saveKey("diaries",JSON.stringify(diaries));

    await axios.post(url, {
            nuguname: await deviceStorage.getItem("nuguname"),
            date: state.selectedDate
        },  
        {
            timeout: 5000 
        }
        ) 
         
        .then((response) => {       
            _onSetState({ 
              isLoading: false,    
            });   
        }) 
        .catch(( err ) => {
            Alert.alert(
                '서버에 연결할 수 없어요. 앱을 끄신 후 다시 실행해 주세요.',
                '다음 사항을 확인해주세요 : \n 1. 현재 기기가 와이파이에 연결되어 있나요? \n 2. 공지 사항을 통해 현재 서비스가 점검 중 인지 확인해 주세요.',
                [{text: '확인'}]
            );  
            _onSetState({ 
                isError: true,
                isLoading: false
              }); 
        });    
} 