
import LinhaTabPartDiaria from '@/model/LinhaTabPartDiaria'
import Maquina from '@/model/Maquina'
import Obra from '@/model/Obra'
import { Page, Text, Image, Document, StyleSheet, View } from '@react-pdf/renderer'

interface PDFFileProps{
    obra: Obra
    maquina: Maquina,
    listaPartDiaria: LinhaTabPartDiaria[],
    periodoInicio: Date,
    periodoFinal: Date
}

export default function PDFFile({obra, maquina, listaPartDiaria, periodoInicio, periodoFinal}: PDFFileProps) {
    const listaFiltrada = listaPartDiaria.filter(e => Number(new Date(e.data_inicial_trabalho)) >= Number(periodoInicio)
     && Number(new Date(e.data_inicial_trabalho)) <= Number(periodoFinal))
    const formato = new Intl.DateTimeFormat("pt-BR", {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    })
    const formato2 = new Intl.DateTimeFormat("en-us", {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    })
    
    const formatoHora = new Intl.DateTimeFormat("pt-BR", {
        hour: "numeric",
        minute: "numeric",
    })
    
    const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    const dias = new Set<string>(listaFiltrada.map(e => `${formato2.format(new Date(e.data_inicial_trabalho))}`))
    const datas: Date[] = []
    dias.forEach(e => datas.push(new Date(e)))
    const datasSort = datas.sort((a, b) => Number(a)-Number(b))

    const styles = StyleSheet.create({
        headerContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            fontSize: 14,
    
        },
        infos: {
            width: '100%',
            fontSize: 12,
            display: 'flex',
            flexDirection: "row",
            borderBottom: '1px solid black'
        },
        titulos: {
            width: '75%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        logo: {
            width: '25%',
        },
        campos: {
            fontSize: 10,
            padding: 10
        },
        body: {
            padding: 10
        },
        table: {
            width: '100%',
            fontSize: 10,
    
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderTop: '1px solid #EEE',
            paddingTop: 2,
            paddingBottom: 2,
        },
        header: {
            backgroundColor: 'lightgray'
        },
        bold: {
            fontWeight: 'bold',
        },
        // So Declarative and unDRY 👌
        row1: {
            paddingLeft: 6,
            padding: 4,
            width: '30%',
            borderRight: '1px solid #b0b0b0',
            borderLeft: '1px solid #b0b0b0'
        },
        row2: {
            width: '10%',
            padding: 4,
            borderRight: '1px solid #b0b0b0'
        },
        row3: {
            width: '7.5%',
            padding: 4,
            borderRight: '1px solid #b0b0b0'
        },
        row4: {
            width: '8.75%',
            padding: 4,
            borderRight: '1px solid #b0b0b0'
        },
        row5: {
            width: '8.75%',
            padding: 4,
            borderRight: '1px solid #b0b0b0'
        },
        row6: {
            width: '8.75%',
            padding: 4,
            borderRight: '1px solid #b0b0b0'
        },
        row7: {
            width: '8.75%',
            padding: 4,
            borderRight: '1px solid #e3e3e3'
        },
        row8: {
            width: '8.75%',
            padding: 4,
            borderRight: '1px solid #e3e3e3'
        },
        row9: {
            width: '8.75%',
            padding: 4,
            borderRight: '1px solid #e3e3e3'
        },
        linha_relatorio: { padding: 2, display: 'flex', flexDirection: 'row', borderBottom: '1px solid lightgray', marginHorizontal: 5, justifyContent: 'space-between' }
    })
    
    function calcularHorasTeI(linha: LinhaTabPartDiaria): { totInterfs: Number, totTrabalhadas: Number } {
        const valores = { totInterfs: 0, totTrabalhadas: 0 }
        const interfs = linha.interferencias.map(e => {
            if (e.hora_final && e.hora_inicial) {
                return (Number(new Date(e.hora_final)) - Number(new Date(e.hora_inicial))) / 3600000
            } else {
                return 0
            }
        })
        if (interfs?.length > 0) {
            valores.totInterfs = interfs.reduce((anterior, prox) => anterior + prox, 0)
        }
        if (linha.data_final_trabalho && linha.data_inicial_trabalho) {
            const totTrabs = (Number(new Date(linha.data_final_trabalho)) - Number(new Date(linha.data_inicial_trabalho))) / 3600000
            valores.totTrabalhadas = totTrabs - interfs.reduce((anterior, proximo) => anterior + proximo)
        }
        return valores
    }
    function relatorios() {
        const relatorio: {
            total_abastecido: Number,
            custo_abastecimento: Number,
            total_trabalhadas: Number,
            total_interferencias: Number,
            consumo: Number,
    
        } = {} as {
            total_abastecido: number,
            custo_abastecimento: number,
            total_trabalhadas: number,
            total_interferencias: Number,
            consumo: number
        }
        const listaCombs = listaFiltrada.map(e => e.interferencias.filter(fi => fi.motivo === "ABASTECIMENTO"))
            .map(res => res.map(k => k.total_combustivel ? k.total_combustivel : 0).reduce((anterior, prox) => Number(anterior) + Number(prox), 0))
        const custosCombs = listaFiltrada.map(e => e.interferencias.filter(fi => fi.motivo === "ABASTECIMENTO"))
            .map(res => res.map(k => k.total_combustivel && k.preco_combustivel ? Number(k.total_combustivel) * Number(k.preco_combustivel) : 0).reduce((anterior, prox) => Number(anterior) + Number(prox), 0))
        const listaHorasTrab = listaFiltrada.map(e => calcularHorasTeI(e).totTrabalhadas)
        const listaHorasointer = listaFiltrada.map(e => calcularHorasTeI(e).totInterfs)
        relatorio.total_abastecido = listaCombs.reduce((ant, prox) => Number(ant) + Number(prox), 0)
        relatorio.custo_abastecimento = custosCombs.reduce((ant, prox) => Number(ant) + Number(prox), 0)
        relatorio.total_trabalhadas = listaHorasTrab.reduce((ant, prox) => Number(ant) + Number(prox), 0)
        relatorio.consumo = Number(relatorio.total_abastecido) - Number(relatorio.total_trabalhadas)
        relatorio.total_interferencias = listaHorasointer.reduce((ant, prox) => Number(ant) + Number(prox), 0)
        return (
            <View style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                flexDirection: 'row',
                paddingTop: 5
            }}>
    
                <View style={{ border: '1px dashed  black ', width: '100%', display: 'flex' }}>
    
                    <View key='006' style={{ ...styles.campos, ...styles.linha_relatorio }}><Text>Total de horas trabalhadas:</Text> <Text>{`${relatorio.total_trabalhadas.toFixed(2)}`.replace(".", ",")}</Text></View>
                    <View key='007' style={{ ...styles.campos, ...styles.linha_relatorio }}><Text>Total de horas de interferências: </Text><Text>{`${relatorio.total_interferencias.toFixed(2)}`.replace(".", ",")}</Text></View>
                    <View key='008' style={{ ...styles.campos, ...styles.linha_relatorio }}><Text>Total abastecido (litros): </Text><Text>{`${relatorio.total_abastecido.toFixed(2)}`.replace(".", ",")}</Text></View>
                    <View key='009' style={{ ...styles.campos, ...styles.linha_relatorio }}><Text>Custo de combustível: </Text><Text>{formatoMoeda.format(relatorio.custo_abastecimento as number)}</Text></View>
                    <View key='009' style={{ ...styles.campos, ...styles.linha_relatorio }}><Text>Consumo ({maquina.unidade}/l): </Text><Text>{`${relatorio.consumo.toFixed(2)}`.replace(".", ",")}</Text></View>
                </View>
    
            </View>
        )
    }
    
    function renderizarTabela() {
        console.log(maquina)
        return (
            <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.header]}>
                    <Text style={styles.row1}>Descrição do serviço</Text>
                    <Text style={styles.row2}>Data</Text>
                    <Text style={styles.row3}>H. Inicial</Text>
                    <Text style={styles.row4}>H. Final</Text>
                    <Text style={styles.row5}>Horímetro inicial</Text>
                    <Text style={styles.row6}>Horímetro final</Text>
                    <Text style={styles.row7}>Operador</Text>
                    <Text style={styles.row8}>Tot. Interfer.</Text>
                    <Text style={styles.row8}>Tot. trabalhadas</Text>
                </View>
                {listaFiltrada.map((row: LinhaTabPartDiaria, i) => (
                    <View key={i} style={i % 2 == 0 ? styles.row : { ...styles.row, backgroundColor: 'lightgray' }} wrap={false}>
                        <Text style={styles.row1}>{row.descricao_serv}</Text>
                        <Text style={styles.row2}>{formato.format(new Date(row.data_inicial_trabalho))}</Text>
                        <Text style={styles.row3}>{formatoHora.format(new Date(row.data_inicial_trabalho))}</Text>
                        <Text style={styles.row4}>{formatoHora.format(new Date(row.data_final_trabalho))}</Text>
                        <Text style={styles.row5}>{row.horimetro_inicial}</Text>
                        <Text style={styles.row6}>{row.horimetro_final}</Text>
                        <Text style={styles.row7}>{row.operador}</Text>
                        <Text style={styles.row6}>{`${calcularHorasTeI(row).totInterfs.toFixed(2)}`}</Text>
                        <Text style={styles.row6}>{`${calcularHorasTeI(row).totTrabalhadas.toFixed(2)}`}</Text>
                    </View>
                ))}
            </View>
        )
    }
    return (
        <Document>
            <Page size='A4' style={styles.body}>
                <View key="001" style={styles.headerContainer} >
                    <View key="002" style={styles.logo}>
                        <Image src={'/logo.png'} />

                    </View>
                    <View key="002" style={styles.titulos}>
                        <Text>Parte diária do equipamento {maquina.nome} {maquina.modelo}</Text>
                    </View>
                </View>
                <View key="003" style={styles.infos}>
                    <View key='004' style={styles.campos}><Text>Período: {formato.format(periodoInicio)} a {formato.format(periodoFinal)}</Text></View>
                    <View key='004' style={styles.campos}><Text>Obra: {obra.codigo} {obra.nome}</Text></View>
                </View>
                {relatorios()}
                <View key="003" style={{
                    ...styles.infos, display: 'flex',
                    justifyContent: 'center',
                    paddingVertical: 5,
                    
                }}><Text>Parte diária</Text></View>
                {renderizarTabela()}


            </Page>


        </Document>
    )
}