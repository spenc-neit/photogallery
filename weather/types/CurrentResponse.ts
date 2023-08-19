export interface CurrentResponse {
    location:{
        name: string,
        region: string
    },
    current:{
        temp_f: string,
        feelslike_f: string,
        condition:{
            icon: string,
            text: string
        }
    }
}