from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = ""

def get_api_response(prompt: str) -> str | None:
    text: str | None = None
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        text = response.choices[0].message["content"]
    except Exception as e:
        print("ERROR: ", e)
    return text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_bot_response', methods=['POST'])
def get_bot_response():
    message = request.json['message']
    prompt = f'User: {message}\nAI:'
    bot_response = get_api_response(prompt)
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)

