import { useEffect, useState } from "react";
import api from "../axios/axios";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Alert,
} from "react-native";

export default function EventoScreen() {
    const [eventos, setEventos] = useState([]);
    const [ingressos, setIngressos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [eventoSelecionado, setEventoSelecionado] = useState("");
    const [mostrarForm, setMostrarForm] = useState(false);
    const [novoIngresso, setNovoIngresso] = useState({ tipo: "", preco: "" });

    async function criarIngresso() {
        try {
            const response = await api.createIngresso({
                tipo: novoIngresso.tipo,
                preco: novoIngresso.preco,
                fk_id_evento: eventoSelecionado.id_evento,
            });
            Alert.alert("Sucesso", response.data.message);

            // Atualiza lista
            const responseAtualizado = await api.getIngressoPorEvento(
                eventoSelecionado.id_evento
            );
            setIngressos(responseAtualizado.data.ingressos);

            // Limpa e esconde o formulário
            setNovoIngresso({ tipo: "", preco: "" });
            setMostrarForm(false);
        } catch (error) {
            console.log("Erro ao criar ingresso", error.response.data.error);
            Alert.alert("Erro", error.response.data.error);
        }
    }

    useEffect(() => {
        getEventos();
    }, []);

    async function getEventos() {
        try {
            const response = await api.getEventos("/eventos");
            setEventos(response.data.events);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.error);
        }
    }

    async function abrirModalComIngressos(evento) {
        setEventoSelecionado(evento);
        setModalVisible(true);
        try {
            const response = await api.getIngressoPorEvento(evento.id_evento);
            setIngressos(response.data.ingressos);
        } catch (error) {
            console.log("Erro ao buscar ingressos", error.response);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eventos Disponíveis</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList
                    data={eventos}
                    keyExtractor={(item) => item.id_evento.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.eventCard}
                            onPress={() => {
                                abrirModalComIngressos(item);
                            }}
                        >
                            <Text style={styles.eventName}>{item.nome}</Text>
                            <Text style={styles.eventLocation}>{item.local}</Text>
                            <Text style={styles.eventDate}>
                                {new Date(item.data_hora).toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
            )}
            <Modal
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Ingressos para</Text>
                        <Text style={styles.modalEventName}>{eventoSelecionado.nome}</Text>
                        {ingressos.length === 0 ? (
                            <Text style={styles.emptyIngressos}>Nenhum ingresso encontrado</Text>
                        ) : (
                            <FlatList
                                data={ingressos}
                                keyExtractor={(item) => item.id_ingresso.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.ingressoItem}>
                                        <Text style={styles.ingressoType}>Tipo: {item.tipo}</Text>
                                        <Text style={styles.ingressoPrice}>Preço: R${item.preco}</Text>
                                    </View>
                                )}
                                ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                            />
                        )}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setMostrarForm(!mostrarForm)}
                        >
                            <Text style={styles.buttonText}>
                                {mostrarForm ? "Cancelar" : "Criar novo ingresso"}
                            </Text>
                        </TouchableOpacity>

                        {mostrarForm && (
                            <View style={styles.newIngressoForm}>
                                <Text style={styles.formLabel}>Tipo do ingresso:</Text>
                                <TextInput
                                    value={novoIngresso.tipo}
                                    onChangeText={(text) =>
                                        setNovoIngresso({ ...novoIngresso, tipo: text })
                                    }
                                    style={styles.input}
                                    placeholder="Ex: VIP, Meia, Inteira..."
                                />
                                <Text style={styles.formLabel}>Preço:</Text>
                                <TextInput
                                    value={novoIngresso.preco}
                                    onChangeText={(text) =>
                                        setNovoIngresso({ ...novoIngresso, preco: text })
                                    }
                                    keyboardType="numeric"
                                    style={styles.input}
                                    placeholder="Ex: 40.00"
                                />
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "#673AB7" }]}
                                    onPress={criarIngresso}
                                >
                                    <Text style={styles.buttonText}>Salvar ingresso</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity
                            style={[styles.button, styles.closeButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
        textAlign: "center",
    },
    eventCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    eventName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007bff",
        marginBottom: 5,
    },
    eventLocation: {
        color: "#555",
        marginBottom: 3,
    },
    eventDate: {
        color: "#888",
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 25,
        width: "80%",
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
        textAlign: "center",
    },
    modalEventName: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: "center",
        color: "#007bff",
    },
    ingressoItem: {
        backgroundColor: "#f0f0f0",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    ingressoType: {
        fontWeight: "bold",
        color: "#444",
    },
    ingressoPrice: {
        color: "#666",
    },
    emptyIngressos: {
        textAlign: "center",
        color: "#777",
        marginTop: 15,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: "#dc3545",
        marginTop: 10,
    },
    newIngressoForm: {
        marginTop: 20,
    },
    formLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
});