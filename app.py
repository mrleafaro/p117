# importe os módulos necessários
from flask import Flask, render_template, request, jsonify

# importando arquivo sentiment_analysis como sa
import sentiment_analysis as sa

app = Flask(__name__)

# rota do aplicativo para a página index
@app.route('/')
def home():
    return render_template('index.html')

# escreva uma rota para requisição post
@app.route('/api_url', methods=['POST'])
def review():
    try:
        # extraia a avaliação do cliente escrevendo a "chave" apropriada dos dados JSON
        review = request.json.get('review')

        # verifique se a avaliação do cliente está vazia, então retorne o erro
        if not review:
            return jsonify({'status': 'error',
                            'message': 'Avaliação em branco'})

        # se a avaliação não estiver vazia, passe-a pela função 'predict'.
        # a função predict retorna 2 coisas: o sentimento e o caminho da imagem na pasta static
        # exemplo: Positivo , ./static/assets/emoticons/positive.png

        sentiment, image_path = sa.predict(review)

        return jsonify({'sentiment': sentiment, 'image_path': image_path})

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == "__main__":
    app.run(debug=True)
