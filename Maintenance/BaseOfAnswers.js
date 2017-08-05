/**
 * Created by Igup on 15.04.2017.
 */

js.module = function (path) {
    js.loadedModules[path] = true;
};
js.module('BaseOfAnswers');


//База с ответами, конструктор для объекта
function Answers () {

    this["test_key"] =  "test_val";
    this["Cat and Mouse"] =  "data:image/png;base64,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";
    this["Life is a Journey"] =  "data:image/png;base64,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";
    this["Aspire to Inspire"] =  "data:image/png;base64,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";
    this["Enjoy Every Moment"] =  "data:image/png;base64,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";
    this["Never Give Up"] =  "data:image/png;base64,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";
    this["Good Vibes Only"] = "data:image/png;base64,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";
    this["Ketchup and Mustard"] = "data:image/png;base64,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";
    this["Seize the Day"] = "data:image/png;base64,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";
    this["Life is Short"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAAUCAIAAAC4QZdWAAAJHklEQVR4nO2Zf1ST1xnHHwICIg2UaYDJAhgEQRrSopnBFBExVY+e0aHoInIwrj05bYdMM2ABISLYjFrO2RkHOay2uFVhgyYrBxKkXRs5aQ6llEZMEZWtFGzKzyghDUkIufvj7dLXaCIKleJ5P+f9I+99ftzvvblP7s37AhAQEBAQEBAQEBAQEBAQLDlK5ch+iZpMue/e4hwWu7mR7CYvH/Ji6bFf/D93PjCQRPJgpwkWXA9CCCFEpVLv204mkwGAzWar1WqTyTQ6Opqenj73tFj4AyGRSAKBQKPRGI1GvV6vUqn27t37aKmc4eHhIRAs/Ow9TjwWW8B8ud7ZYpu1Ln8qgBqTkJieN2M2fnyxZBH13Pz80ozZaL+d0Pa79vdY5v1alXplSJTyvTM/srTvkUqlAGC1WgGgtraWRqNdvXp1cHDw1q1bDxv+QEpKSgoKCiYnJ9vb2ykUCovFamhoSEtLk0gk8xjBD3h7e6vV6qioqDNnHtPsEdyFw3bH2JZZKkd/+NvgvabHqcdvlePO4xovHzIWuOB6nO2EeKxWK0Jo5cqVC947xvj4OEIoIiICu62qqkIItbW14RXOZyckk8lYkgXQuniQFlvAgnGzqxUAVvhTHNrpSdycv/aJmkxHa3qf2XLA3u7mRtp2qERwfuBks+WERH/49Q9XUWMAwD8wLEPUVNCgO9lsEZwfSM4Quc4zR7BKozFSXq3sLn7f+HKFihIaCwAn3pu0O7juCMuw7VBJkdQgOD/wyD809qWPEHJ3dweAsbExbB1zudy+vj6TydTb23vgwP3HaA8PCwtramrS6XQWi2VgYEAkEjnrkc/nUygUABAKhfHx8dnZ2XgrdiQ2Go1KpXLdunX29g0bNrS1tRkMBr1eL5PJGAwGXkBJSYnBYJicnLQ3Puw8/HR4copw7YYdAKAfv+tMFc1KTc+74Pt00Fc9ihX+lP35dVHM3Zhp86+PbeWe8PD0vtnV+t2dURpj2/68iwDALWhc98s9UxPa/s/bvHzIyQeLE1JzXORxIPVoDfeExH6tiUvGW/cL641TOrNRT41mvfj7twDgemcLZupVSV0Ltsv++kvlf774sFcl7VVJbbNzOhbeF+xgCQAtLS1SqTQ1NfXChQtBQUEKhYJCodTV1e3eff8xYjQ2Nu7Zs0er1ba1tZHJ5OLi4pycHAef6upqADh+/LhWq+3s7MzOzh4eHu7r68P71NfXj46O6nS6zZs319TUYI0MBqO9vX379u09PT0ajWbnzp1KpdJehwBw7NgxpVI5NDTkMBaCxwq2FRw62Xyw6F8vvaksabGWylFiej7gjqMvvakslaOQSCYABARHlMrRkXIFFh66nv38vtyng9bYTaImEwAUSQ2lchSXnOGxzJsSGsvcxQ8Mp7vI46DH4XqOw8NbGdsyASAkklkqR8XvG+Ge46iLjjC3Z7dnzXF+5vJgBv9ZqVQihJhMJgBEREQghBQKxzHiQwwGA0IoIyPD29s7NjaWz+fT6fR7/QUCgVarRf9Hr9cnJyfjU3G5XACg0+kIIaPx+7/Tra2tCKHCwkLstqioCCEkk8nsUVlZWfCkHEfdFlvAo4P/H2WdMX93Z7T7g9p//73IbjqV5pd3QevpvQIfNWOZPvkrH+xzNCt17YYdwTRGUDh9medyACjc6cY5LE5Mz8Nyavu7ez+RfNpc9cf6URd58HreyAydHBt0plbMDTbcHl7uG1DQMIF15+VDxk6khTvdAKBIanDWEZbhTFb4nZGBucwPtjRDQ0MHBwfvbffz89Pr9fjPBoNhxYq7up6envbxuWuM+HChUJiXlwcAZrO5u7tbIpFUVVXZqwgPiURiMpkcDiczM5NGo127di0mJsaeKjg4eHh42N/f//bt2wDg5uYGAJiY1atXa7VaAAgJCRkaGpqamsKqDgDCw8MHBgbIZDJ2IsWilihL/unoqTQ/s1HvzOpGIgHAjS651WKyN7p7eM5aLbtfqdy059X+Lz7ovvT22FDfb9+4jFnb3sm/3tkcm5i+hp4UEsWkRrNoz6a4yPNQarEHpzab0zPkAzsyf+d0sPOERCIBgFwuN5l+6NrT09Niuf8Y8/Pzm5ub09PTk5KSmEwmi8VKSUnZsWOH3YHBYAiFQp1Ox+fzOzo6Ojo6qqurR0ZGoqOj8WmxurXZbA+lVq//sebh8bPki9A1IwOakMiNHU2VNz6T/Wx1ZDyH9+1/1diCfm57FgA0/eUV3bf9NEYK5v9UwM+3Hizyp1AlFbyWs9mB4fTfVV0JpycNf9XjLM88QXcvPheCMVwU8DzRaDQbN26srKyUyWSRkZE8Hk+tVjurwKCgoPLyciqVyuPxsrOz6XT6lStXkpKS8D46nW7fvn2zs7O1tbUdHR0AgG2AExMTztLa6erq2rJlS1ZW1unTpwGAx+MBQHt7u90Be0fysKX70+QJL8JPJBX78+t+U9j49ZfKoHC6r3+gor7s6mUAgMmxwVW/iD7yp4/Gv7kR9kyizTZLIrnPWKap6zYFrYl7rUr9zY2uwLBYALjZ1dpzud5ZHgdSj9Y4vCe8dC7XhcIZs9E6Y/ZY5vVyhertvGQXgh3gnpAAQEN5Br67e5HJZPgVX1Li9CVqRUVFXV1dY2OjUqmk0+mBgYFlZWXOnEdGRjZt2hQXF6dWq7u6umJjYwGgtbUV7zM4OHju3LkjR44oFAqlUgkAbDYbAMrLy10IxhAKhQqFoqysDHs4xGKxpqamhEKhg5vRaDSbzV5eXiqVKjk5Gb+HLyGe8CK8erl+mZfP83sFYbGJ01O6jy+e+uhdEWb6h5iberQmmMYAAFl1znr23jVxW6nRrHeEnBd44kjmroh4jnFy/NOWs5feyrWYDM7yOLA2/gX87a0bn7lWiJCt/Z9idprAb2WI53JfF4IdiEl4EQBI7g/4BtevX4+/DQgIcOZZX1/v4+MjEAgSExN1Ot2pU6dcvHVACHE4HLFYvGvXLg6HMz4+fvbs2dxcx58bPp/f39+fmZnJZrOtVqtGo6mpqbE/AnWBSqVis9kikSghIYFEIsnl8vz8/J6eHgc3m80mFosFAkFISIivr+8SLUICAgICAgICAgICAgICAgICgkXifxz0P+QLgXr9AAAAAElFTkSuQmCC";
    this["Change is Good"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAAUCAIAAAC4QZdWAAALMUlEQVR4nO2ae1CTVxbADxHD0/CwEHysAlqVLI1pZLPAsCwidVCRZX2wSpFSig6LbsUZCmykGNLoYm2ZVliGsm4Wra2MpWAzKcFHWUxTimkWI1UGqe2k0caQhhBCDOETuPvHXb9JQ4jUpYWZ5jf5I7nn3HPOvXz3O/eeC4ALFy5cuHDhwoULFy5cuPil4jbbAdgjkCDy+9jDUYtJr/zk7OV6LkITWPTadr9Ri2lW4iG51/dF7UGO844UinvsHwtkH77xU0SVl5eXm5vLYDAIgujo6ODxeHK5HAAQQgDg5+dnMv18U+SQJ4skNTW1oKCAzWZ7e3vrdDqpVMrn83t7e2ckJBqNNjQ0BABubnPrsXef7QAcc1v+8cT4mNeCwGWM2Pj04oejln+/z5/FeL76z8WHoxby54DmjnN99/meB2qUTy1d/VMswvr6+hdeeGFwcLC9vT00NHTTpk2JiYnJycnt7e0z7uuJaW5uBoCxsbHpdxEIBIcPHx4fH1coFEajkc1m7969OyUlJS4urru7+yeL1MUkBBIkkCAPbxr+ydqQJZCgV86oJ4t+znj8gpb9qF4e3jTcccbj2bFjB0Kou7s7MDAQt9TX1yOEFAoFACCEEEI02s86RTNCYmIiQkin00VFReEWT09PkUiEEBKLxTPigkaj4fmZEWszCGW2A3gMXylaAcDHP9iunZmQUfCPXp7IerCu55nf7yLb3dwoG/bwC0+rysXEq02mF/92JWgZAwD86aGZPNHhDwzlYqLwtCoxk+fczjTBK20FK2l/ddeRjyz7KjuCl0cCwKsfDpEKzh1hCxv28MuazYWnVY990eTk5AAAj8czGAy4hcvl7t27Nz09ndSJi4tTKpUWi0Umk61ZswYAKBQKn89XqVQEQZhMpitXrjAYDHi0aJOSkrq6uiwWS0dHR2RkJGmHz+fr9XqNRoNXPrm8MzIyent7rVZrT0/Prl2OJ81WPzQ0VCQSGQwGgiBUKhWPx5usX1BQAAClpaX4bQIAVqs1Nzd3/fr1GRkZuCUqKurSpUtms9lkMrW0tLBYLLL7VCIKhVJZWWk0GlUqVWpq6lSzOrvMrc0xPHpqyYMfa0PWjsLThvtfV+asJEXhaxOfL2u2Phi629u5ZFWU94KF7x7ZelsuBoC47YXJuSfMxv57t+XByxiBi1Zov7lRvZ+Vf1Kx+Ol1um9vDfarljFivXwDWt45NNivmsqOXTx229FOUfU3N9pIqWV44P7XSnpopK8//e7ta+8URO8pF6/mbAGAno7m91/bFhGTNpUjbIGwPvj2lsykv+e1IBAAPng909adLTqdLigoaPny5Wq1erIUv+aHh4c7OzsZDMaSJUs+/fTT+Pj4wsLCEydO9Pf3y+VyBoOxYsWKGzdusFgsrD8wMKBUKiMjI+l0+rVr16KjowHgwIEDVVVVIyMjUqmUzWYHBQUBgJ+fX2JiYnNz89DQUGdnZ1RU1MKFC7du3To5WdmeCRUKxbp1627duqVSqWJjYwMCAg4dOvTWW29NHldYWJhKpXI4cBaL1dHR4eXl9fnnnwNATEzMgwcP8OvGiaioqOj48eN4FLGxsQsWLIC5dyacc+BUsKdc/HzZhb1vyvgfjwkkKD69BGy2o3vflAkkaOkqDgAELlopkKCXXm/H3Zf/Ou53O4sCQsJJEU9kBYCyZrNAgtYmZrrP9wxeHsnZnEcPYzqxYxeP3Ye9McdWytqQBQBLV3EEEnTkIwtM2o46cYTVnn0ue5rzQxAEQsjf39+hFOcfnDqYTCZCyGKxAEBcXFxRUVF4eDgArFy5EiFktVpJ/aysLADgcDikPgAolUrSVFpaGpnZZDIZQojD4ZCmHJ5FbTOh2WxGCGVmZnp6ekZGRubl5TGZTIfjIvfYXC4X2QAAra2tCKHS0lKsUFZWhhBqaWlxLrp58yZCCKfrzMzMubkdnXOvBLvq6AOjruty/SfvloFNkix+T0P19LHt9ZAYKf+DN/4eEZP2dFTyohWskDDmfKoXAJRuctv4YkV8ejG2qbnT1fNZ0zVxzV8bdE7s2MZzImv50PcOMg+WVmQsMg9qvXwDD38wgN15eNPwjrR0kxsAlDWbp3KELbyRHWbsV01nfgwGQ0BAwFQZAz9hixYt0mq1/v7+g4OD8OjFn5aWlpyczGKxmEyml5cXbrfVDwwMHBgYIPUtFouXlxedTtfpdJ6eniMjIwDg5+en0Wh8fH4wlpGREW9vb4eR4ExYUVFRXFwMAKOjo11dXU1NTTU1NeRqx2i1WjqdHhERgWuhO3bsyMjIoFKpW7ZswSGZzWYfH58lS5ZoNBoAWLp06d27d4eHh2k0mhOR1Wr18PAICgrS6/UhISH379+HuZcJ52h11Pk9hBuFAgB9CskYYSUb57lTx8eIlPzq6K3771y/3HVR+P3d3twTV7H00r9KbsvFkfHp4cyEpas5yyJiVjyb5MTOj4oWbx0nJqasBD7W0eiD6dbxlUrl+vXrORwOuQhZLFZDQ0NDQwN51sLP98TEBNmrurp6//79ly9fFgqFvb29V69etbWJ9e0qmRSK43oBbpdIJDiXYqhUKkFMOWklJSVisTg9PT0hIYHD4cTExCQlJSUnJ9vqyGSy7du3p6Sk4EXY2NjY2NhIXio8MXgScMy2EzKnmOuFGYf0q24CQKeo+v3Xtl0Ulujv9X0pPY8faPZz2QAgqsr/QlI3z52K9RcELk79S+3vd3GvNhyr+jPz7wfYABDGTHBi5/8E/fDv/VhHThawHUKhEABKS0vxjtTd3Z3P569evZosKjokOzsbAPLz8+vq6qhU6nQc4UWelJQEALYljZs3bwJAdXX1tm3bSkpK+vr6zp8/72QFLl68uLa2lsvlHjt2jMlkstlsAEhISLBTO3nyJB5XbGwsbnF3d9+3bx+pgAs2eCDwqEAllUqdi/r6+gBg48aNAGC37OcOczQTOuezpso/lZzbXdr47S1ZSBjT15/e3nD0y6sAAEPfq4N+FfHS8Tb9d32hz8RPTIxTKPMeEiPL1kSHhK89UKP8rk9BD40EgK8Urd1XG6ayY0fawTq7e8KL/yxyEuHDUcvYw1H3+R77KjuExYlOArYj49UmcFqYOXv2bGpq6s6dO+/cuYOrL2FhYUNDQ4WFhU7iUavVERERbW1tfX198fHx4+Pj8+bNm+pgiblw4UJxcfGpU6eysrLwCRBTWVl57ty5xsZGmUzGZDLpdPrRo0ed2NFqtdHR0WvXrlUqlQqFAldfW1tb7dSkUml5efmRI0ekUqlCoTAYDGw2m06nA8D169cBgMvltre3Hz16NCUlBQBiYmKGh4e5XK5z0alTp6qqqurq6jIzM21H4cIZTmr0tiL2xpyDdT08kbX4Pc2GPXw3t/+l9JBwVt7b8nIx8coZ9W9T8nMq2gQStOo3m338grcdEpac05aLieL3NFsP1FA9fZ3YsXNq98l7Wz45JLtiTGImr6zZ/MoZtTftKSeO7MY7nbtQCoVSUFDQ3d1ttVoNBkNTUxO+h4AflkNsr8VYLJZcLicIQq1W5+fnt7W1IYQ2b948lT4AUKnU2tpak8mkUqnIwgw+++Xk5PT09FitVo1Gw+fzHW5cbS0HBwcLhUKtVksQhEajqamp8fX1dTi0pKQksVis1+sJgrh3715TU9OuXbtI+xwOp6WlxWg04nsI2+qOE1FFRQW+osjOzp6bhRkXLhwjEAhefvllvHsMDg5GCM36v8K5cPHLoqurCyFkNBrFYrFarUYInTlzZraDcuHil0R4eLhIJNLr9WNjY1qtVigUOj9DunDhwoULFy5cPBH/Bdbe45ep2V6KAAAAAElFTkSuQmCC";
    this["Smile More Often"] = "data:image/png;base64,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";

}

//Меняем местами ключ и значение, чтобы было удобнее искать ответы
Answers.prototype.valueToKey = function () {
    for (var key in this) {
        //TODO: добавить проверку hasOwnProperty
        var val = this[key];
        this[val] = key;
        delete this[key];
    }
};
/*Подключаем Класс и его методы
BaseOfAnswers = new Answers;
BaseOfAnswers.valueToKey();
 */