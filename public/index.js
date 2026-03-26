listar();

function novo() {
    document.getElementById("conteudo").style.display = "none";
    document.getElementById("formulario").style.display = "block";
    document.getElementById("txtnome").value = "";
    document.getElementById("txttelefone").value = "";
    document.getElementById("txtemail").value = "";
}

function cancelar() {
    document.getElementById("conteudo").style.display = "block";
    document.getElementById("formulario").style.display = "none";
    document.getElementById("txtnome").value = "";
    document.getElementById("txttelefone").value = "";
    document.getElementById("txtemail").value = "";
    listar()
}

async function salvar() {
    const pessoa = {
        nome: document.getElementById("txtnome").value,
        telefone: document.getElementById("txttelefone").value,
        email: document.getElementById("txtemail").value
    };

    const url = editandoId ? `/pessoa/${editandoId}` : "/pessoa";
    const metodo = editandoId ? "PUT" : "POST";

    await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pessoa)
    });

    fecharFormulario();
}

async function listar() {
    const resp = await fetch("/pessoa");
    const dados = await resp.json();

    let tabela = `
        <table class="table table-striped table-hover align-middle mt-3">
            <thead class="table-dark">
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>`;

    dados.forEach(p => {
        tabela += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.telefone}</td>
                <td>${p.email}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="prepararAlterar(${p.idpessoa})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluir(${p.idpessoa})">Excluir</button>
                </td>
            </tr>`;
    });

    tabela += `</tbody></table>`;
    document.getElementById("conteudo").innerHTML = tabela;
}

async function prepararAlterar(id) {
    const resp = await fetch(`/pessoa/${id}`);
    const p = await resp.json();
    
    editandoId = id;
    document.getElementById("txtnome").value = p.nome;
    document.getElementById("txttelefone").value = p.telefone;
    document.getElementById("txtemail").value = p.email;
    
    document.getElementById("conteudo").style.display = "none";
    document.getElementById("formulario").style.display = "block";
}

async function excluir(id) {
    if (confirm("Deseja realmente excluir este registro?")) {
        await fetch(`/pessoa/${id}`, { method: "DELETE" });
        listar();
    }
}

function fecharFormulario() {
    document.getElementById("conteudo").style.display = "block";
    document.getElementById("formulario").style.display = "none";
    listar();
}